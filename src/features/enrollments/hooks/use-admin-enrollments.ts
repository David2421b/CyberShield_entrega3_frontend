"use client";

import { useCallback, useEffect, useState } from "react";
import { HttpError } from "../../common/http";
import { useAuth } from "../../auth/hooks/auth-provider";
import type { AdminEnrollment } from "../domain/enrollment";
import { getAllEnrollments } from "../services/enrollment-service";

export function useAdminEnrollments() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (authLoading) return;
    if (user?.role !== "admin") { setLoading(false); return; }
    setLoading(true);
    setError("");
    try {
      const response = await getAllEnrollments();
      setData(response.data);
    } catch (reason) {
      setError(reason instanceof HttpError ? reason.message : "No se pudieron cargar las inscripciones.");
    } finally {
      setLoading(false);
    }
  }, [authLoading, user]);

  useEffect(() => { void refresh(); }, [refresh]);
  return { data, loading, error, refresh };
}
