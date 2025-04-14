using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class User
    {
        public User()
        {
            Addresses = new HashSet<Address>();
            Carts = new HashSet<Cart>();
            Items = new HashSet<Item>();
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
            UserRoles = new HashSet<UserRole>();
        }

        public int UserId { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? PhoneNumber { get; set; }
        public DateTime? LastLogin { get; set; }
        public int? Status { get; set; }
        public int? Role { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
