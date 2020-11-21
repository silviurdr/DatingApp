﻿using API.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;

        }

        public static int GetUserId(this ClaimsPrincipal user)
        {

            var balaur = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return  int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        }
    }
}
