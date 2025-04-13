using System.Net.Mail;
using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace ShopApi.Helper
{
    public class Unity
    {
        public static int GetIdOfObject<T>(T obj) where T : class
        {
            var properties = obj.GetType().GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if (property.Name == "Id")
                    return (int)property.GetValue(obj, null);
            }
            return -1;
        }
        public static string Md5Hash(string input)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }
        public static string GenerateRandomPassword(int length = 8)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var res = new StringBuilder();
            using (var rng = new RNGCryptoServiceProvider())
            {
                byte[] uintBuffer = new byte[sizeof(uint)];

                while (length-- > 0)
                {
                    rng.GetBytes(uintBuffer);
                    uint num = BitConverter.ToUInt32(uintBuffer, 0);
                    res.Append(valid[(int)(num % (uint)valid.Length)]);
                }
            }
            return res.ToString();
        }
            public static async Task SendEmailAsync(string toEmail, string subject, string body)
            {
                var config = ConfigurationHelper.config; // dùng IConfiguration từ appsettings.json

                var smtpClient = new SmtpClient(config["Email:SmtpServer"])
                {
                    Port = int.Parse(config["Email:Port"]),
                    Credentials = new NetworkCredential(config["Email:Username"], config["Email:Password"]),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(config["Email:SenderEmail"], config["Email:SenderName"]),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);

                await smtpClient.SendMailAsync(mailMessage);
            }
        
    }
}
