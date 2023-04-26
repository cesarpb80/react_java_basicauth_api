package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class BasicAuthenticationSecurityConfiguration {

	//Filter Chain
	//Authentication all requests
	//Basic authentication
	//Disale csrf
	//Stateless rest api
	
	//Error: sponse to preflight request doesn't pass access control check:
	//Basic Auth, implementacion de metodo
		
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		return http.authorizeHttpRequests(auth -> auth
													  .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() //SOLUCION AL ERROR: sponse to preflight request doesn't pass access control check: 
													  .anyRequest().authenticated())
				   .httpBasic(Customizer.withDefaults())
				   .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				   .csrf().disable()				
				   .build();		
		
	}
}
