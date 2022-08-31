using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace register.Models
{
    public class jwtservice
    {
        public string Secretkey { get; set; }

        public int TokenDuration { get; set; }
        private readonly IConfiguration config;
        public jwtservice(IConfiguration _config)
        {
            config = _config;
            this.Secretkey = config.GetSection("jwtConfig").GetSection("key").Value;
            this.TokenDuration = Int32.Parse(config.GetSection("jwtConfig").GetSection("Duration").Value);
        }
        public string GenerateToken(string id,string firstname,string lastname,string email,string mobile,string gender)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.Secretkey));

            var signature = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var payload = new[]
            {
                new Claim("id",id),
                new Claim("firstname",firstname),
                new Claim("lastname",lastname),
                new Claim("email",email),
                new Claim("mobile",mobile),
                new Claim("gender",gender)
            };
            var jwtToken = new JwtSecurityToken(
                issuer:"localhost",
                audience:"localhost",
                claims:payload,
                expires:DateTime.Now.AddMinutes(TokenDuration),
                signingCredentials:signature
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);  
        }
    }
}
