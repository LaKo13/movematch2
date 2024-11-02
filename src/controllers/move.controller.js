import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';

export const createMove = async (req, res) => {
  const { pickupLocation, dropoffLocation, inventory, pickupDate, flexibleDate } = req.body;
  const customerId = req.user.id;

  const move = await prisma.move.create({
    data: {
      customerId,
      status: 'pending',
      pickupDate: new Date(pickupDate),
      flexibleDate,
      pickupAddress: pickupLocation.address,
      pickupCity: pickupLocation.city,
      pickupState: pickupLocation.state,
      pickupZip: pickupLocation.zip,
      dropoffAddress: dropoffLocation.address,
      dropoffCity: dropoffLocation.city,
      dropoffState: dropoffLocation.state,
      dropoffZip: dropoffLocation.zip,
      inventory: {
        create: inventory.map(item => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          description: item.description,
          specialHandling: item.specialHandling,
          photos: item.photos?.join(','),
        })),
      },
    },
    include: {
      inventory: true,
    },
  });

  res.status(201).json({
    success: true,
    data: move,
  });
};

export const getMove = async (req, res) => {
  const { id } = req.params;

  const move = await prisma.move.findUnique({
    where: { id },
    include: {
      inventory: true,
      bids: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!move) {
    throw new ApiError(404, 'Move not found');
  }

  res.json({
    success: true,
    data: move,
  });
};

export const getUserMoves = async (req, res) => {
  const userId = req.user.id;
  const userType = req.user.userType;

  const moves = await prisma.move.findMany({
    where: userType === 'customer' 
      ? { customerId: userId }
      : {
          bids: {
            some: {
              moverId: userId,
            },
          },
        },
    include: {
      inventory: true,
      bids: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: moves,
  });
};