package io.github.knowmyminister.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the Education entity.
 */
public class EducationDTO implements Serializable
{

	private static final long serialVersionUID = 5912322597731360558L;

	private Long id;

	private String title;

	private String institute;

	private Instant startDate;

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

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public String getInstitute()
	{
		return institute;
	}

	public void setInstitute(String institute)
	{
		this.institute = institute;
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

		EducationDTO educationDTO = (EducationDTO) o;
		if (educationDTO.getId() == null || getId() == null)
		{
			return false;
		}
		return Objects.equals(getId(), educationDTO.getId());
	}

	@Override
	public int hashCode()
	{
		return Objects.hashCode(getId());
	}

	@Override
	public String toString()
	{
		return "EducationDTO{" + "id=" + getId() + ", title='" + getTitle() + "'" + ", institute='" + getInstitute()
				+ "'" + ", startDate='" + getStartDate() + "'" + ", endDate='" + getEndDate() + "'" + "}";
	}
}
