<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    number: {
      type: Number,
      default: 0
    }
  },
  render(h, context) {
    const { icon, title, number } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }

    if (number) {
      vnodes.push(
        <i style="line-height:20px;text-align:center;color:#fff;font-size:16px;background:#f00;border-radius:50%;position: absolute;top:10px;right:34px;padding:0 4px">
          {number}
        </i>
      );
    }

    return vnodes;
  }
};
</script>
