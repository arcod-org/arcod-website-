// Lightweight health check for UptimeRobot.
// It deliberately does NOT query the database, so Neon can scale to zero between visits.
export const dynamic = "force-dynamic";
export function GET() {
  return Response.json({ status: "ok", time: new Date().toISOString() });
}
