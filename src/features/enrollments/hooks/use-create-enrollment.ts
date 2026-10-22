"use client";

import { useState } from "react";
import { HttpError } from "../../common/http";
import { createEnrollment } from "../services/enrollment-service";
import type { Enrollment } from "../domain/enrollment";

export function useCreateEnrollment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(input: { courseId: number; message?: string }): Promise<Enrollment> {
    setLoading(true);
    setError(null);
    try {
      const response = await createEnrollment(input);
      return response.data;
    } catch (reason) {
      const message = reason instanceof HttpError
        ? reason.message
        : "No se pudo enviar la inscripción. Intenta de nuevo.";
      setError(message);
      throw reason;
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, clearError: () => setError(null) };
}
