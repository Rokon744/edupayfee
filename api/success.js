export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // SSLCommerz theke asha tran_id
      const { tran_id } = req.body;
      
      // tran_id theke roll number ber kora (e.g., 820545-123456 -> 820545)
      const roll = tran_id ? tran_id.split("-")[0] : "unknown";

      // Browser-ke redirect kora GET request-e
      return res.redirect(303, `/payment/success?roll=${roll}`);
    } catch (error) {
      console.error("Redirect Error:", error);
      return res.redirect(303, "/payment/fail");
    }
  } else {
    // GET request ashle shudhu redirect kore deya
    return res.redirect(303, "/");
  }
}