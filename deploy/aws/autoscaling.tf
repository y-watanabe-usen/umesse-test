## autoscaling 本番環境のみオートスケールする
## umesse-users read
resource "aws_appautoscaling_target" "umesse_users_read" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-users"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_users_read_policy" {
  name               = "dynamodb-read-capacity-utilization-${aws_appautoscaling_target.umesse_users_read.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_users_read.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_users_read.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_users_read.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value = 70
  }
}

## umesse-users write
resource "aws_appautoscaling_target" "umesse_users_write" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-users"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_users_write_policy" {
  name               = "dynamodb-write-capacity-utilization-${aws_appautoscaling_target.umesse_users_write.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_users_write.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_users_write.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_users_write.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value = 70
  }
}

## umesse-contents read
resource "aws_appautoscaling_target" "umesse_contents_read" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-contents"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_contents_read_policy" {
  name               = "dynamodb-read-capacity-utilization-${aws_appautoscaling_target.umesse_contents_read.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_contents_read.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_contents_read.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_contents_read.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value = 70
  }
}

## umesse-contents write
resource "aws_appautoscaling_target" "umesse_contents_write" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-contents"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_contents_write_policy" {
  name               = "dynamodb-write-capacity-utilization-${aws_appautoscaling_target.umesse_contents_write.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_contents_write.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_contents_write.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_contents_write.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value = 70
  }
}

## umesse-external read
resource "aws_appautoscaling_target" "umesse_external_read" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-external"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_external_read_policy" {
  name               = "dynamodb-read-capacity-utilization-${aws_appautoscaling_target.umesse_external_read.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_external_read.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_external_read.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_external_read.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value = 70
  }
}

## umesse-external write
resource "aws_appautoscaling_target" "umesse_external_write" {
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/umesse-external"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "umesse_external_write_policy" {
  name               = "dynamodb-write-capacity-utilization-${aws_appautoscaling_target.umesse_external_write.resource_id}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.umesse_external_write.resource_id
  scalable_dimension = aws_appautoscaling_target.umesse_external_write.scalable_dimension
  service_namespace  = aws_appautoscaling_target.umesse_external_write.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value = 70
  }
}
