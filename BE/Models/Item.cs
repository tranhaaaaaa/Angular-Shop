using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Item
    {
        public Item()
        {
            Cartitems = new HashSet<Cartitem>();
            Itemdetails = new HashSet<Itemdetail>();
            Itemimages = new HashSet<Itemimage>();
            Reviews = new HashSet<Review>();
        }

        public int ItemId { get; set; }
        public string? ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public double? Discount { get; set; }
        public bool? IsAvailable { get; set; }
        public int? CategoryId { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Category? Category { get; set; }
        public virtual User? CreatedByNavigation { get; set; }
        public virtual ICollection<Cartitem> Cartitems { get; set; }
        public virtual ICollection<Itemdetail> Itemdetails { get; set; }
        public virtual ICollection<Itemimage> Itemimages { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
