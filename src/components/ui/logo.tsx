import Link from "components/ui/link";
import cn from "classnames";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
	return (
		<Link
			to={'/'}
			className={cn("inline-flex focus:outline-none", className)}
			{...props}		>
			<img
				src={''}
				alt={'Reoplex'}
				height={50}
				width={50}
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
