package io.github.knowmyminister.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Language entity.
 */
public class LanguageDTO implements Serializable
{
	private static final long serialVersionUID = -6102514541220904891L;

	private Long id;

	private String name;

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o)
		{
			return true;
		}
		if (o == null || getClass() != o.getClass())
		{
			return false;
		}

		LanguageDTO languageDTO = (LanguageDTO) o;
		if (languageDTO.getId() == null || getId() == null)
		{
			return false;
		}
		return Objects.equals(getId(), languageDTO.getId());
	}

	@Override
	public int hashCode()
	{
		return Objects.hashCode(getId());
	}

	@Override
	public String toString()
	{
		return "LanguageDTO{" + "id=" + getId() + ", name='" + getName() + "'" + "}";
	}
}
