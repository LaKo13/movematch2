import { prisma } from '../lib/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      userType: true,
      companyName: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json({
    success: true,
    data: user,
  });
};

export const updateProfile = async (req, res) => {
  const { name, email, companyName } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser && existingUser.id !== req.user.id) {
    throw new ApiError(400, 'Email already in use');
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      name,
      email,
      companyName,
    },
    select: {
      id: true,
      email: true,
      name: true,
      userType: true,
      companyName: true,
      createdAt: true,
    },
  });

  res.json({
    success: true,
    data: user,
  });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedPassword },
  });

  res.json({
    success: true,
    message: 'Password updated successfully',
  });
};