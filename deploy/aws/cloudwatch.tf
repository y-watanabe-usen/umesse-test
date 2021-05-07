resource "aws_cloudwatch_event_rule" "umesse_event_rule" {
  for_each            = toset(var.name)
  name                = format("%s-event-rule", each.key)
  schedule_expression = "rate(1 hour)"
  is_enabled          = false # コンソール上で有効にする

  lifecycle {
    ignore_changes = [is_enabled]
  }
}

resource "aws_cloudwatch_event_target" "umesse_event_sync" {
  for_each  = toset(var.name)
  target_id = format("%s-event-sync", each.key)
  rule      = aws_cloudwatch_event_rule.umesse_event_rule[each.key].name
  arn       = aws_lambda_alias.umesse_sync_alias[each.key].arn
}

resource "aws_lambda_permission" "umesse_sync_permission" {
  for_each      = toset(var.name)
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.umesse_sync_function.function_name
  principal     = "events.amazonaws.com"
  qualifier     = aws_lambda_alias.umesse_sync_alias[each.key].name
  source_arn    = aws_cloudwatch_event_rule.umesse_event_rule[each.key].arn
}
