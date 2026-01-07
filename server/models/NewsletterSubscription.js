import mongoose from 'mongoose';

const newsletterSubscriptionSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    status: { type: String, default: 'active', enum: ['active', 'unsubscribed'] },
    subscribed_at: { type: Date, default: Date.now },
    ip_address: String,
    user_agent: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const NewsletterSubscription = mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);
