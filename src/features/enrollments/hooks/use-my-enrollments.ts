"use client";

import { useEffect, useState } from "react";
import { HttpError } from "../../common/http";
import { useAuth } from "../../auth/hooks/auth-provider";
import type { Enrollment } from "../domain/enrollment";
import { getMyEnrollments } from "../services/enrollment-service";

export function useMyEnrollments() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    getMyEnrollments()
      .then((response) => { if (!cancelled) setData(response.data); })
      .catch((reason: unknown) => { if (!cancelled) setError(reason instanceof HttpError ? reason.message : "No se pudieron cargar tus inscripciones."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [authLoading, user]);

  return { data, loading: authLoading || loading, error };
}
