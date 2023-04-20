<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/*">
		<xsl:apply-templates select="root" />
	</xsl:template>
	<xsl:template match="root">
		<div class="list-group list-group-flush">
			<xsl:apply-templates select="node">
				<xsl:with-param name="level" select="0"/>
			</xsl:apply-templates>
		</div>
	</xsl:template>
	<xsl:template match="node">
	<xsl:param name="level" />
				<a class="list-group-item list-group-item-action list-group-item-light p-3" href="{@url}">
					<xsl:attribute name="class">
						list-group-item list-group-item-action list-group-item-light p-3
						<xsl:text> level</xsl:text><xsl:value-of select="$level +1" />
						</xsl:attribute>
					<xsl:choose>
						<xsl:when test="@icon !=''">
							<img src="{@icon}" title="{@title}" />
						</xsl:when>
					</xsl:choose>
					<span><xsl:value-of select="@text" /></span>
				</a>

				<xsl:if test="node">
					<div>
						<xsl:attribute name="class">
						list-group-item list-group-item-action list-group-item-light p-3
						<xsl:text> level</xsl:text><xsl:value-of select="$level +1" />
						</xsl:attribute>
						<xsl:apply-templates select="node">
							<xsl:with-param name="level" select="$level + 1" />
						</xsl:apply-templates>
					</div>
				</xsl:if>

	</xsl:template>
</xsl:stylesheet>
