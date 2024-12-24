import React, { Component } from "react";
import { Text, TextStyle } from "react-native";
import { vw } from "./stylesheet";

export class Tiny extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // kanit medium 12 12
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Medium', color: this.props.color, fontSize: vw(2.5), lineHeight: vw(2.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Small extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Inter medium 13 16 
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Inter-Medium', color: this.props.color, fontSize: vw(3.25), lineHeight: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class SubtitleCard extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Reg 12 12
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Regular', color: this.props.color, fontSize: vw(3), lineHeight: vw(3) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Body3 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Reg 12 18
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Regular', color: this.props.color, fontSize: vw(3), lineHeight: vw(4.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Body2 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Med 18 Auto
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Medium', color: this.props.color, fontSize: vw(4.5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Body1 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Reg 16 Auto
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Regular', color: this.props.color, fontSize: vw(4) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Title3 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Reg 20 Auto
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Regular', color: this.props.color, fontSize: vw(5) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Title2 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit SemiBld 24 Auto
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-SemiBold', color: this.props.color, fontSize: vw(6) }, style]}>
                {children}
            </Text>
        );
    }
}

export class Title1 extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Bld 32 39
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Bold', color: this.props.color, fontSize: vw(8), lineHeight: vw(9.75) }, style]}>
                {children}
            </Text>
        );
    }
}

export class TitleX extends Component<{ children: React.ReactNode, style?: TextStyle[] | any, lineNumber?: number, color?: string }> {
    render() {
        const { color, children, style, lineNumber } = this.props;

        // Kanit Bld 64 80
        return (
            <Text numberOfLines={lineNumber} style={[{ fontFamily: 'Kanit-Bold', color: this.props.color, fontSize: vw(16), lineHeight: vw(20) }, style]}>
                {children}
            </Text>
        );
    }
}