namespace ShopApi.Helper
{
    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public int UserId { get; set; }
    }
    public class ForgotPassword
    {
        public string Email { get; set; }
    }
}