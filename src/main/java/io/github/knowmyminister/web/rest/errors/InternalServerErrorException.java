package io.github.knowmyminister.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

/**
 * Simple exception with a message, that returns an Internal Server Error code.
 */
public class InternalServerErrorException extends AbstractThrowableProblem
{

	private static final long serialVersionUID = 7671676588197005913L;

	public InternalServerErrorException(String message)
	{
		super(ErrorConstants.DEFAULT_TYPE, message, Status.INTERNAL_SERVER_ERROR);
	}
}
