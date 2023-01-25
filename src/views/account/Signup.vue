<template>
    <div class="uk-background-default uk-border-rounded uk-box-shadow-small">
        <div class="uk-container uk-container-xsmall uk-padding-large">

        <h1>Sign Up</h1>
        <form class="uk-form-stacked uk-margin-medium-top" action="auth/account-registration">
                <div class="uk-margin-bottom">
                    <label class="uk-form-label" for="name">Ruisnaam</label>
                    <div class="uk-form-controls">
                        <input class="uk-input uk-border-rounded" name="username" type="text" required>
                    </div>
                </div>
                <div class="uk-margin-bottom">
                    <label class="uk-form-label" for="name">Email (work)</label>
                    <div class="uk-form-controls">
                        <input class="uk-input uk-border-rounded" name="mail" type="email" required>
                    </div>
                </div>
                <div class="uk-text-center">
                    <input class="uk-button uk-button-primary uk-border-rounded" type="submit" value="Send Message">
                </div>
            </form>
        </div>
    </div>
</template>