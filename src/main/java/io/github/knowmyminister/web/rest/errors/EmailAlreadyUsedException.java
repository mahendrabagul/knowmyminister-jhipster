package io.github.knowmyminister.web.rest.errors;

public class EmailAlreadyUsedException extends BadRequestAlertException
{

	private static final long serialVersionUID = -5618151705393503020L;

	public EmailAlreadyUsedException()
	{
		super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Email address already in use", "userManagement", "emailexists");
	}
}
