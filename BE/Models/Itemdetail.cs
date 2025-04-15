using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Itemdetail
    {
        public Itemdetail()
        {
            Cartitems = new HashSet<Cartitem>();
            Orderdetails = new HashSet<Orderdetail>();
        }

        public int ItemDetailId { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public int? Quantity { get; set; }
        public int? ItemId { get; set; }
        public double? ItemPrice { get; set; }

        public virtual Item? Item { get; set; }
        public virtual ICollection<Cartitem> Cartitems { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
    }
}
