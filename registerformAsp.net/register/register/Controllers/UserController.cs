using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using register.Models;
using System;
using System.Linq;

namespace register.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserContext _context;

        public UserController(IConfiguration config,UserContext context)
        {
            _config = config;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public IActionResult Create(User user)
        {
            if(_context.Users.Where(u =>u.Email==user.Email).FirstOrDefault()!=null)
            {
                return Ok("Already Exist");
            }
            user.MemberSince = DateTime.Now;
            _context.Users.Add(user);   
            _context.SaveChanges();
            return Ok("Success");
        }
        [AllowAnonymous]
        [HttpPost("LoginUser")]
         public IActionResult Login(Login user)
        {
             var userAvailable=_context.Users.Where(u =>u.Email==user.Email && u.Pwd==user.Pwd).FirstOrDefault();
            if(userAvailable!=null)
            {
                return Ok(new jwtservice(_config).GenerateToken(
                    userAvailable.UserID.ToString(),        
                    userAvailable.FirstName,
                    userAvailable.LastName,
                    userAvailable.Email,
                    userAvailable.Mobile,
                    userAvailable.Gender
                        )
                    );
            }
            return Ok("Failure");
        }

    }
}
//https://localhost:44390/api/