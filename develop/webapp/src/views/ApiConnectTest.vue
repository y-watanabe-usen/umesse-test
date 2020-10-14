<template>
  <UserProvider>
    <ApiConnectTestInputForm />
    <ApiConnectTestResult />
  </UserProvider>
</template>

<script>
import UserProvider from "@/components/UserProvider";
import ApiConnectTestInputForm from "@/components/ApiConnectTestInputForm";
import ApiConnectTestResult from "@/components/ApiConnectTestResult";
export default {
  components: {
    UserProvider,
    ApiConnectTestInputForm,
    ApiConnectTestResult,
  },
};
</script>