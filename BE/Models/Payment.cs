using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Payment
    {
        public int PaymentCode { get; set; }
        public int OrderId { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }

        public virtual Order Order { get; set; } = null!;
    }
}
