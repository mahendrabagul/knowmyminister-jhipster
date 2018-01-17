package io.github.knowmyminister.cucumber.stepdefs;

import io.github.knowmyminister.KnowMyMinisterApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = KnowMyMinisterApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
