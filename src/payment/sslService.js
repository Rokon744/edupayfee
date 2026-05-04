const CLOUD_FUNCTION_URL = "http://localhost:3000/initiatePayment";

export async function initiatePayment({
  studentName,
  studentRoll,
  amount,
  successUrl,
  failUrl,
  cancelUrl,
}) {
  const response = await fetch(CLOUD_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentName,
      studentRoll,
      amount,
      successUrl,
      failUrl,
      cancelUrl,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.gatewayUrl) {
    throw new Error(data.error || "Failed to initiate payment.");
  }

  return data.gatewayUrl;
}