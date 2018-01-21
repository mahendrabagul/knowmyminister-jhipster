package io.github.knowmyminister.service.dto;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotNull;

/**
 * A DTO for the SocialLink entity.
 */
public class SocialLinkDTO implements Serializable
{

	private static final long serialVersionUID = 3470097721875642078L;

	private Long id;

	@NotNull
	private String provider;

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

	public String getProvider()
	{
		return provider;
	}

	public void setProvider(String provider)
	{
		this.provider = provider;
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

		SocialLinkDTO socialLinkDTO = (SocialLinkDTO) o;
		if (socialLinkDTO.getId() == null || getId() == null)
		{
			return false;
		}
		return Objects.equals(getId(), socialLinkDTO.getId());
	}

	@Override
	public int hashCode()
	{
		return Objects.hashCode(getId());
	}

	@Override
	public String toString()
	{
		return "SocialLinkDTO{" + "id=" + getId() + ", provider='" + getProvider() + "'" + ", link='" + getLink() + "'"
				+ "}";
	}
}
