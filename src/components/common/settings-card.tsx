import React from 'react';
import { Link} from 'react-router-dom';
import {ArrowNext} from 'components/icons/arrow-next'

type SettingsCardProps = {
  icon?: JSX.Element;
  heading: string;
  description: string;
  to?: string;
  externalLink?: string;
  disabled: boolean;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  icon,
  heading,
  description,
  to = '/settings/account',
  externalLink = null,
  disabled = false,
}) => {
  if (disabled) {
    to = "/settings";
  }

  return (
    <Link to={to} className="flex items-center flex-1">
      <button
        className="flex items-center flex-1 group bg-grey-0 rounded-rounded p-small border border-grey-20"
        disabled={disabled}
        onClick={() => {
          if (externalLink) {
            window.location.href = externalLink;
          }
        }}
      >
        <div className="h-large w-large rounded-circle flex justify-center items-center text-purple-500 group-disabled:bg-gray-10 group-disabled:text-gray-40">
          {icon}
        </div>
        <div className="text-left flex-1 mx-large">
          <h3 className="text-grey-90 text-base group-disabled:text-grey-40 m-0">
            {heading}
          </h3>
          <p className="hidden md:flex text-grey-50 text-base group-disabled:text-grey-40 m-0">
            {description}
          </p>
        </div>
        <div className="text-grey-40 text-base group-disabled:text-grey-30">
          <ArrowNext />
        </div>
      </button>
    </Link>
  );
};

export default SettingsCard;

export const SettingsCardNoIcon: React.FC<SettingsCardProps> = ({
  heading,
  description,
  to = '/settings/account',
  externalLink = null,
  disabled = false,
}) => {
  if (disabled) {
    to = '/settings';
  }

  return (
    <Link to={to} className="flex items-center flex-1">
      <button
        className="flex items-center flex-1 group bg-grey-0 rounded-rounded p-small border border-grey-20"
        disabled={disabled}
        onClick={() => {
          if (externalLink) {
            window.location.href = externalLink;
          }
        }}
      >
        <div className="text-left flex-1 mx-large">
          <h3 className="text-grey-90 text-base group-disabled:text-grey-40 m-0">
            {heading}
          </h3>
          <p className="hidden md:flex text-grey-50 text-base group-disabled:text-grey-40 m-0">
            {description}
          </p>
        </div>
        <div className="text-grey-40 text-base group-disabled:text-grey-30">
          <ArrowNext />
        </div>
      </button>
    </Link>
  );
};

