package io.github.knowmyminister.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.knowmyminister.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".addresses", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".awards", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".workExperinces", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".educations", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Minister.class.getName() + ".socialLinks", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Award.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Image.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Photo.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.PoliticalParty.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.PoliticalParty.class.getName() + ".socialLinks", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.PoliticalParty.class.getName() + ".ministers", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.PoliticalParty.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.PoliticalParty.class.getName() + ".headquarters", jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.SocialLink.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Bio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.WorkExperience.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Education.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Language.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.knowmyminister.domain.State.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
