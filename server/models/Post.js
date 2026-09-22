const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  // Add this field:
  affiliateProduct: {
    title: { type: String, default: "Recommended Resource" },
    productName: String,
    productImage: String,
    affiliateUrl: String,
    price: { type: String, default: "Check on Amazon" },
  },
});
