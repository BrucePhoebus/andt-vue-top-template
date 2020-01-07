<template>
	<div class="demo--demo01">
		<!-- demo01 -->
		<h1>demo01</h1>
	</div>
</template>

<script>

  export default {
    name: 'demo-demo01',
    data() {
      return {

      };
    },
    created() {
    },
    methods: {

		},
    mounted() {
    }
  };
</script>

<style lang="less" type="text/less" scoped>
	.demo--demo01 {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fff;

		.header-option {
			height: 40px;
			line-height: 40px;
			padding: 0 10px;

			.header-left {
				float: left;
			}

			.header-right {
				float: right;

				.user-search-filter {
					margin-left: 10px;
					width: 300px;
				}
			}
		}

		.content-list {
			height: calc(100% - 40px);

			.table-list-content {
				height: 100%;
				overflow-y: auto;
			}
		}

	}
</style>
