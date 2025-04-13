using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Cart
    {
        public Cart()
        {
            Cartitems = new HashSet<Cartitem>();
        }

        public int CartId { get; set; }
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Cartitem> Cartitems { get; set; }
    }
}
