"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

function getRequiredText(formData: FormData, field: string) {
  const value = formData.get(field);

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid ${field}`);
  }

  return value.trim();
}

function getStudentData(formData: FormData) {
  const email = formData.get("email");
  const yearValue = Number(formData.get("year"));
  const year = Number.isInteger(yearValue) ? yearValue : NaN;

  if (email !== null && typeof email !== "string") {
    throw new Error("Invalid email");
  }

  if (!Number.isInteger(year) || year < 1 || year > 8) {
    throw new Error("Year must be an integer between 1 and 8");
  }

  return {
    studentCode: getRequiredText(formData, "studentCode"),
    name: getRequiredText(formData, "name"),
    email: email?.trim() || null,
    major: getRequiredText(formData, "major"),
    year,
  };
}

function assertStudentId(id: number) {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("Invalid student ID");
  }
}

export async function createStudent(formData: FormData) {
  await prisma.student.create({
    data: getStudentData(formData),
  });

  redirect("/students");
}

export async function updateStudent(id: number, formData: FormData) {
  assertStudentId(id);

  await prisma.student.update({
    where: { id },
    data: getStudentData(formData),
  });

  redirect("/students");
}

export async function deleteStudent(id: number) {
  assertStudentId(id);

  await prisma.student.delete({
    where: { id },
  });

  revalidatePath("/students");
}