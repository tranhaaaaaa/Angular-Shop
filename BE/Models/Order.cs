using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderdetails = new HashSet<Orderdetail>();
            Payments = new HashSet<Payment>();
        }

        public int OrderId { get; set; }
        public DateTime? OrderDate { get; set; }
        public double? TotalPrice { get; set; }
        public string? Status { get; set; }
        public string? Note { get; set; }
        public int? UserId { get; set; }
        public DateTime? OverDueDate { get; set; }
        public int? AddressId { get; set; }

        public virtual Address? Address { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Orderdetail> Orderdetails { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
