import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export const createBid = async (req, res) => {
  const { moveId, amount, estimatedDuration, message } = req.body;
  const moverId = req.user.id;

  // Verify user is a mover
  if (req.user.userType !== 'mover') {
    throw new ApiError(403, 'Only movers can create bids');
  }

  // Check if move exists and is open for bids
  const move = await prisma.move.findUnique({
    where: { id: moveId },
    include: { bids: true },
  });

  if (!move) {
    throw new ApiError(404, 'Move not found');
  }

  if (move.status !== 'pending') {
    throw new ApiError(400, 'Move is not open for bids');
  }

  // Check if mover has already bid on this move
  const existingBid = move.bids.find(bid => bid.moverId === moverId);
  if (existingBid) {
    throw new ApiError(400, 'You have already bid on this move');
  }

  const bid = await prisma.bid.create({
    data: {
      moveId,
      moverId,
      amount,
      estimatedDuration,
      message,
      status: 'pending',
    },
    include: {
      mover: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: bid,
  });
};

export const acceptBid = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const bid = await prisma.bid.findUnique({
    where: { id },
    include: { move: true },
  });

  if (!bid) {
    throw new ApiError(404, 'Bid not found');
  }

  if (bid.move.customerId !== userId) {
    throw new ApiError(403, 'Not authorized to accept this bid');
  }

  if (bid.move.status !== 'pending') {
    throw new ApiError(400, 'Move is not pending');
  }

  // Update bid and move status in a transaction
  const [updatedBid] = await prisma.$transaction([
    prisma.bid.update({
      where: { id },
      data: { status: 'accepted' },
      include: {
        mover: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
      },
    }),
    prisma.move.update({
      where: { id: bid.moveId },
      data: { status: 'accepted' },
    }),
    // Reject all other bids
    prisma.bid.updateMany({
      where: {
        moveId: bid.moveId,
        id: { not: id },
      },
      data: { status: 'rejected' },
    }),
  ]);

  res.json({
    success: true,
    data: updatedBid,
  });
};