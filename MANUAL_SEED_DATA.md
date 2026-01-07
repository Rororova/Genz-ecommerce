# Manual Data Entry for Cuck Chair Database

If you prefer to manually insert data into MongoDB (using Compass or Atlas) instead of letting the server do it automatically, you can use the JSON data below.

> **Note**: MongoDB uses "Collections" (tables) and "Documents" (rows).

## 1. Collection: `users`
Create a collection named `users` and insert this document.
*This creates the moderator account with password 'moderator123'.*

```json
{
  "username": "moderator",
  "email": "moderator@cuckchair.com",
  "password_hash": "4c8425b174053ea6935b29c2b0e0e9c26235a1a01b784e6ac91b8bdce",
  "display_name": "CUCK MODERATOR",
  "role": "moderator",
  "is_active": true,
  "email_verified": true,
  "created_at": { "$date": "2024-01-01T00:00:00Z" },
  "updated_at": { "$date": "2024-01-01T00:00:00Z" }
}
```

> **IMPORTANT**: After inserting, copy the `_id` of this user (e.g., `65aaa...`). You will need it for the posts below. Let's call this `YOUR_USER_ID`.

---

## 2. Collection: `hashtags`
Create a collection named `hashtags` and insert these documents.

```json
[
  {
    "tag": "SIGMA",
    "slug": "sigma",
    "usage_count": 1,
    "trending": true
  },
  {
    "tag": "FURNITURE",
    "slug": "furniture",
    "usage_count": 1,
    "trending": false
  },
  {
    "tag": "CHAIRS",
    "slug": "chairs",
    "usage_count": 1,
    "trending": true
  }
]
```
> **Copy IDs**: Copy the `_id` for 'SIGMA' (call it `TAG_SIGMA_ID`) and 'FURNITURE' (call it `TAG_FURN_ID`).

---

## 3. Collection: `forumposts`
Create a collection named `forumposts` and insert these documents.
*Replace `YOUR_USER_ID` and `TAG_...` with the actual IDs you copied.*

**Post 1: Mog Your Living Room**
```json
{
  "title": "HOW TO MOG YOUR LIVING ROOM FURNITURE",
  "slug": "how-to-mog-your-living-room-furniture",
  "excerpt": "Stop letting your sofa dominate the space. Assert dominance over your upholstery.",
  "content": "<p>Welcome to the ultimate guide on furniture dominance...</p>",
  "featured_image": "https://images.unsplash.com/photo-1513694203232-719a280e022f",
  "author": { "$oid": "YOUR_USER_ID" },
  "category": "LIFESTYLE",
  "category_bg_color": "bg-lime-400",
  "featured": true,
  "read_time": 5,
  "hashtags": [
    { "$oid": "TAG_SIGMA_ID" },
    { "$oid": "TAG_FURN_ID" }
  ],
  "published": true,
  "published_at": { "$date": "2024-01-01T00:00:00Z" },
  "views": 0,
  "likes_count": 0,
  "comments_count": 0
}
```

**Post 2: Corners to Cry In**
```json
{
  "title": "Top 10 Corners to Cry In",
  "slug": "top-10-corners-to-cry-in",
  "excerpt": "We rated every corner of a standard apartment based on acoustics.",
  "content": "<p>Number 4: The hallway corner. Perfect echo-to-privacy ratio.</p>",
  "featured_image": "https://images.unsplash.com/photo-1592078615290-033ee584e267",
  "author": { "$oid": "YOUR_USER_ID" },
  "category": "LIFESTYLE",
  "category_bg_color": "bg-yellow-400",
  "featured": false,
  "published": true,
  "published_at": { "$date": "2024-01-01T00:00:00Z" }
}
```
