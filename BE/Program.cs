using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ShopApi.Helper;
using ShopApi.Services.Impl;
using ShopApi.Services;
using System.Text;
using ShopApi.Models;
using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using Microsoft.AspNetCore.Cors.Infrastructure;

IConfiguration configuration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();

var builder = WebApplication.CreateBuilder(args);
ConfigurationHelper.Initialize(builder.Configuration);
// Add services to the container.
builder.Services.AddRazorPages();
var dbConnection = Environment.GetEnvironmentVariable("DB");
IServiceCollection services = builder.Services;
IdentityModelEventSource.ShowPII = true;
services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    x.JsonSerializerOptions.PropertyNamingPolicy = null;
    x.JsonSerializerOptions.WriteIndented = true;
}).AddOData(options => options.Select().Filter().OrderBy().Expand().EnableQueryFeatures().AddRouteComponents(GetEdmModel()));
//string connectionString = builder.Configuration["ConnectionStrings:QLSX_PHIM"];
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = int.MaxValue;
});
builder.Services.AddDbContext<ShopSellerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("value")));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt.Issuer"],
        ValidAudience = builder.Configuration["Jwt.Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt.Key"]))
    };
});

services.Configure<FormOptions>(options =>
{
    options.MemoryBufferThreshold = Int32.MaxValue;
});

services.AddRouting();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<ICartItemService, CartItemService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IItemDetailService, ItemDetailService>();
builder.Services.AddScoped<IItemImageService, ItemImageService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IReviewService, ReviewService>();

services.AddTransient<IAuthenticationService, AuthenticationService>();






services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mirror API", Version = "v1", Description = "Version: 1.0.0" });
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
    c.RoutePrefix = "DocumentAPI";

});
app.UseCors(builder =>
{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});
ConfigurationHelper.Initialize(builder.Configuration);
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
IEdmModel GetEdmModel()
{
    var odataBuilder = new ODataConventionModelBuilder();
    odataBuilder.EntitySet<Category>("Categories").EntityType.HasKey(x => x.CategoryId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Address>("Addresses").EntityType.HasKey(x => x.AddressId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Cart>("Carts").EntityType.HasKey(x => x.CartId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Cartitem>("CartItems").EntityType.HasKey(x => x.CartItemId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Item>("Items").EntityType.HasKey(x => x.ItemId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Itemdetail>("ItemDetails").EntityType.HasKey(x => x.ItemDetailId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Itemimage>("ItemImages").EntityType.HasKey(x => x.ItemImageId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Order>("Orderses").EntityType.HasKey(x => x.OrderId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Orderdetail>("OrderDetails").EntityType.HasKey(x => x.OrderDetailId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Payment>("Payments").EntityType.HasKey(x => x.PaymentCode).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<User>("Users").EntityType.HasKey(x => x.UserId).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<UserRole>("UserRoles").EntityType.HasKey(x => x.Id).Expand(5).Count().Page(100, 100);

    odataBuilder.EntitySet<Role>("Roles").EntityType.HasKey(x => x.Id).Expand(5).Count().Page(100, 100);
    odataBuilder.EntitySet<Review>("Reviews").EntityType.HasKey(x => x.ReviewId).Expand(5).Count().Page(100, 100);


    return odataBuilder.GetEdmModel();
}