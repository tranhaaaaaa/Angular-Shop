using System;
using System.Collections.Generic;

namespace ShopApi.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Item Item { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
