package io.github.knowmyminister.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the WorkExperience entity.
 */
public class WorkExperienceDTO implements Serializable
{

	private static final long serialVersionUID = -116448968280348958L;

	private Long id;

	@NotNull
	private String organization;

	private String description;

	@NotNull
	private Instant startDate;

	@NotNull
	private Instant endDate;

	private Long ministerId;

	private Long languageId;

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getOrganization()
	{
		return organization;
	}

	public void setOrganization(String organization)
	{
		this.organization = organization;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public Instant getStartDate()
	{
		return startDate;
	}

	public void setStartDate(Instant startDate)
	{
		this.startDate = startDate;
	}

	public Instant getEndDate()
	{
		return endDate;
	}

	public void setEndDate(Instant endDate)
	{
		this.endDate = endDate;
	}

	public Long getMinisterId()
	{
		return ministerId;
	}

	public void setMinisterId(Long ministerId)
	{
		this.ministerId = ministerId;
	}

	public Long getLanguageId()
	{
		return languageId;
	}

	public void setLanguageId(Long languageId)
	{
		this.languageId = languageId;
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

		WorkExperienceDTO workExperienceDTO = (WorkExperienceDTO) o;
		if (workExperienceDTO.getId() == null || getId() == null)
		{
			return false;
		}
		return Objects.equals(getId(), workExperienceDTO.getId());
	}

	@Override
	public int hashCode()
	{
		return Objects.hashCode(getId());
	}

	@Override
	public String toString()
	{
		return "WorkExperienceDTO{" + "id=" + getId() + ", organization='" + getOrganization() + "'" + ", description='"
				+ getDescription() + "'" + ", startDate='" + getStartDate() + "'" + ", endDate='" + getEndDate() + "'"
				+ "}";
	}
}
