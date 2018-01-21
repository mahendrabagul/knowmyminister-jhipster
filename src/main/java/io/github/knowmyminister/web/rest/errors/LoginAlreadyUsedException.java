package io.github.knowmyminister.web.rest.errors;

public class LoginAlreadyUsedException extends BadRequestAlertException
{

	private static final long serialVersionUID = 4128794079244930535L;

	public LoginAlreadyUsedException()
	{
		super(ErrorConstants.LOGIN_ALREADY_USED_TYPE, "Login already in use", "userManagement", "userexists");
	}
}
