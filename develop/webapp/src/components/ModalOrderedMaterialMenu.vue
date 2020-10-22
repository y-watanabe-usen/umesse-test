<template>
  <div
    class="modal fade modal1"
    id="modal1"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <ul class="modal-content shadow">
        <li>
          <button>編集</button>
        </li>
        <li>
          <button>センターにアップロード</button>
        </li>
        <li>
          <button>共有</button>
        </li>
        <li>
          <button>削除</button>
        </li>
        <li>
          <button>購入明細</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
</script>

<style scoped>
button {
  border: none;
  background-color: #ffffff;
  font-size: initial;
}
button:focus {
  outline: 0;
}
ul {
  z-index: 1000;
  position: absolute;
  text-align: center;
  width: 230px;
  left: 580px;
  top: 160px;
  list-style: none;
  border-radius: 10px;
  padding-left: 0;
}
li {
  line-height: 4em;
  background-color: #ffffff;
  border-bottom: 1px solid #cccccc;
}
li:first-child {
  border-radius: 5px 5px 0 0;
}
li:last-child {
  border-radius: 0 0 5px 5px;
  border-bottom: none;
}
ul:after {
  z-index: -1;
  content: "";
  position: absolute;
  margin-left: 165px;
  top: -18px;
  border-style: solid;
  border-color: transparent transparent transparent #ffffff;
  border-width: 15px 0 15px 17.32px;
  transform: rotate(-90deg);
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.1));
}
.modal-content {
  border: none;
  box-shadow: none;
}
</style>