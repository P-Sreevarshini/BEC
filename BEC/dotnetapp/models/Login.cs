﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class Login
    {
 
        public string Username { get; set; }

        public string Email { get; set; }
 
        public string Password { get; set; }
    }
}
