 # Clockify Slack Notifier
 
A simple example of how to use the [Clockify Webhooks](https://clockify.me/webhooks)' for receive a message
and send notifications to a Slack channel.

This project manage the Clockify's webhooks:

* `/clockify/projects/new`: the webhook manage the "Project created" event of Clockify
* `/clockify/clients/new`: the webhook manage the "Client created" event of Clockify

You should assign a different secret to every Clockify events. Then, configure the env vars:

* `CLOCKIFY_PROJECT_CREATED_SECRET`
* `CLOCKIFY_CLIENT_CREATED_SECRET`

You must configure the Slack webhook for enable the message publishing and set the `SLACK_HOOK` env.
