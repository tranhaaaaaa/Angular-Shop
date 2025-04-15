using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ShopApi.Models
{
    public partial class ShopSellerContext : DbContext
    {
        public ShopSellerContext()
        {
        }

        public ShopSellerContext(DbContextOptions<ShopSellerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Cartitem> Cartitems { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Item> Items { get; set; } = null!;
        public virtual DbSet<Itemdetail> Itemdetails { get; set; } = null!;
        public virtual DbSet<Itemimage> Itemimages { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Orderdetail> Orderdetails { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserRole> UserRoles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=DESKTOP-TPS0JEE\\SQLEXPRESS;database=ShopSeller;user=sa;password=123;TrustServerCertificate=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("addresses");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.District)
                    .HasMaxLength(255)
                    .HasColumnName("district");

                entity.Property(e => e.Province)
                    .HasMaxLength(255)
                    .HasColumnName("province");

                entity.Property(e => e.SpecificAdd)
                    .HasMaxLength(255)
                    .HasColumnName("specificAdd");

                entity.Property(e => e.Town)
                    .HasMaxLength(255)
                    .HasColumnName("town");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__addresses__UserI__4BAC3F29");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("carts");

                entity.Property(e => e.CartId).HasColumnName("cart_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__carts__UserId__4E88ABD4");
            });

            modelBuilder.Entity<Cartitem>(entity =>
            {
                entity.ToTable("cartitems");

                entity.Property(e => e.CartItemId).HasColumnName("cartItem_id");

                entity.Property(e => e.CartId).HasColumnName("cart_id");

                entity.Property(e => e.ItemDetailId).HasColumnName("itemDetailId");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.Cartitems)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK__cartitems__cart___5CD6CB2B");

                entity.HasOne(d => d.ItemDetail)
                    .WithMany(p => p.Cartitems)
                    .HasForeignKey(d => d.ItemDetailId)
                    .HasConstraintName("FK_cartitems_itemdetails");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Cartitems)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK__cartitems__item___5DCAEF64");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CategoryDescription)
                    .HasMaxLength(255)
                    .HasColumnName("categoryDescription");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(255)
                    .HasColumnName("categoryName");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("item");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.IsAvailable).HasColumnName("isAvailable");

                entity.Property(e => e.ItemDescription)
                    .HasMaxLength(255)
                    .HasColumnName("itemDescription");

                entity.Property(e => e.ItemName)
                    .HasMaxLength(255)
                    .HasColumnName("itemName");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__item__category_i__5441852A");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK__item__CreatedBy__534D60F1");
            });

            modelBuilder.Entity<Itemdetail>(entity =>
            {
                entity.ToTable("itemdetails");

                entity.Property(e => e.ItemDetailId).HasColumnName("itemDetailId");

                entity.Property(e => e.Color).HasMaxLength(50);

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.ItemPrice).HasColumnName("itemPrice");

                entity.Property(e => e.Size).HasMaxLength(50);

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Itemdetails)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK__itemdetai__item___571DF1D5");
            });

            modelBuilder.Entity<Itemimage>(entity =>
            {
                entity.ToTable("itemimages");

                entity.Property(e => e.ItemImageId).HasColumnName("itemImageId");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.ItemImageUrl)
                    .HasMaxLength(255)
                    .HasColumnName("itemImageURL");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Itemimages)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK__itemimage__item___59FA5E80");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Note)
                    .HasMaxLength(255)
                    .HasColumnName("note");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("date")
                    .HasColumnName("orderDate");

                entity.Property(e => e.OverDueDate)
                    .HasColumnType("date")
                    .HasColumnName("overDueDate");

                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasColumnName("status");

                entity.Property(e => e.TotalPrice).HasColumnName("totalPrice");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK__orders__address___6754599E");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__orders__UserId__66603565");
            });

            modelBuilder.Entity<Orderdetail>(entity =>
            {
                entity.ToTable("orderdetails");

                entity.Property(e => e.OrderDetailId).HasColumnName("orderDetail_id");

                entity.Property(e => e.Discount).HasColumnName("discount");

                entity.Property(e => e.ItemDetailId).HasColumnName("itemDetailId");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.ItemDetail)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.ItemDetailId)
                    .HasConstraintName("FK__orderdeta__itemD__6B24EA82");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Orderdetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__orderdeta__order__6C190EBB");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => new { e.PaymentCode, e.OrderId })
                    .HasName("PK__payments__31BC91D8A67651EE");

                entity.ToTable("payments");

                entity.Property(e => e.PaymentCode).HasColumnName("paymentCode");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(355)
                    .HasColumnName("paymentMethod");

                entity.Property(e => e.PaymentStatus)
                    .HasMaxLength(50)
                    .HasColumnName("paymentStatus");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__payments__order___6EF57B66");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews");

                entity.Property(e => e.ReviewId).HasColumnName("review_id");

                entity.Property(e => e.Comment).HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__reviews__item_id__1CBC4616");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__reviews__user_id__1DB06A4F");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FullName).HasMaxLength(255);

                entity.Property(e => e.LastLogin).HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__UserRole__RoleId__74AE54BC");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserRole__UserId__73BA3083");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
