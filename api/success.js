export default async function handler(req, res) {
  if (req.method === "POST") {
    // SSLCommerz theke asha tran_id theke roll ta ber kora
    const tran_id = req.body.tran_id || "";
    const roll = tran_id.split("-")[0]; // Apnar tran_id format jodi Roll-Timestamp hoy

    // React Success Page-e GET request diye redirect kora
    // Jate browser normal bhabe page-ta load korte pare
    res.redirect(303, `/payment/success?roll=${roll}`);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}