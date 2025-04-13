﻿using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Address
    {
        public Address()
        {
            Orders = new HashSet<Order>();
        }

        public int AddressId { get; set; }
        public int? UserId { get; set; }
        public string? Province { get; set; }
        public string? Town { get; set; }
        public string? District { get; set; }
        public string? SpecificAdd { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
