// api/success.js
export default async function handler(req, res) {
  // SSLCommerz POST রিকোয়েস্ট পাঠালে এটি কাজ করবে
  if (req.method === "POST") {
    try {
      const { tran_id } = req.body;
      
      // tran_id থেকে রোল আলাদা করা (ধরি আপনি Roll-Timestamp ফরমেটে পাঠিয়েছেন)
      const roll = tran_id ? tran_id.split("-")[0] : "unknown";

      // সরাসরি আপনার রিঅ্যাক্ট সাকসেস পেজে রিডাইরেক্ট
      return res.redirect(303, `/payment/success?roll=${roll}`);
    } catch (error) {
      return res.redirect(303, "/payment/fail");
    }
  } else {
    // সরাসরি কেউ এই লিংকে ঢুকলে হোমপেজে পাঠাবে
    return res.redirect(303, "/");
  }
}