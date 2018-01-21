package io.github.knowmyminister.service.dto;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the Photo entity.
 */
public class PhotoDTO implements Serializable
{

	private static final long serialVersionUID = -5179442909080613386L;

	private Long id;

	@NotNull
	private String title;

	@NotNull
	private String link;

	private Long ministerId;

	private Long politicalPartyId;

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

	public String getLink()
	{
		return link;
	}

	public void setLink(String link)
	{
		this.link = link;
	}

	public Long getMinisterId()
	{
		return ministerId;
	}

	public void setMinisterId(Long ministerId)
	{
		this.ministerId = ministerId;
	}

	public Long getPoliticalPartyId()
	{
		return politicalPartyId;
	}

	public void setPoliticalPartyId(Long politicalPartyId)
	{
		this.politicalPartyId = politicalPartyId;
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

		PhotoDTO photoDTO = (PhotoDTO) o;
		if (photoDTO.getId() == null || getId() == null)
		{
			return false;
		}
		return Objects.equals(getId(), photoDTO.getId());
	}

	@Override
	public int hashCode()
	{
		return Objects.hashCode(getId());
	}

	@Override
	public String toString()
	{
		return "PhotoDTO{" + "id=" + getId() + ", title='" + getTitle() + "'" + ", link='" + getLink() + "'" + "}";
	}
}
