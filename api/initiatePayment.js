import axios from "axios";

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { studentName, studentRoll, amount, successUrl, failUrl, cancelUrl } = req.body;

  const params = new URLSearchParams({
    store_id: "test69f89690dadd7", 
    store_passwd: "test69f89690dadd7@ssl",
    total_amount: amount.toString(),
    currency: "BDT",
    tran_id: `${studentRoll}-${Date.now()}`,
    success_url: successUrl,
    fail_url: failUrl || successUrl,
    cancel_url: cancelUrl || successUrl,
    product_name: "Student Tuition Fee",
    product_category: "Education",
    product_profile: "general",
    cus_name: studentName,
    cus_email: "student@example.com",
    cus_add1: "Dhaka", cus_city: "Dhaka", cus_country: "Bangladesh", cus_phone: "01700000000",
    ship_name: studentName, ship_add1: "Dhaka", ship_city: "Dhaka", ship_country: "Bangladesh",
    emi_option: "0", num_of_installment: "0",
  });

  try {
    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const data = response.data;
    if (data.status !== "SUCCESS" || !data.GatewayPageURL) {
      return res.status(400).json({ error: data.failedreason || "Failed" });
    }

    return res.status(200).json({ gatewayUrl: data.GatewayPageURL });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}